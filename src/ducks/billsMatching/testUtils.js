const parseDate = str => {
  const [day, month, year] = str.split('-').map(x => parseInt(x, 10))
  try {
    return new Date(year, month - 1, day).toISOString()
  } catch (e) {
    console.warn(`${str} is not a valid date`) // eslint-disable-line no-console
    throw e
  }
}

const parseAmount = x => parseFloat(x, 10)
const parseBool = x => (x == 'true' ? true : false)
const parseStr = x => x

const rowRx = /\s*\|\s*/

const parseReimbursements = reimbursementStr => {
  return reimbursementStr.split(';').map(amount => {
    return {
      amount: parseInt(amount, 10)
    }
  })
}

const doctypes = {
  'io.cozy.bank.operations': {
    _id: parseStr,
    date: parseDate,
    label: parseStr,
    amount: parseAmount,
    automaticCategoryId: parseStr,
    reimbursements: parseReimbursements
  },
  'io.cozy.bills': {
    _id: parseStr,
    amount: parseAmount,
    groupAmount: parseAmount,
    originalAmount: parseAmount,
    originalDate: parseDate,
    date: parseDate,
    isRefund: parseBool,
    vendor: parseStr,
    type: parseStr,
    isThirdPartyPayer: parseBool
  }
}

const parseLine = (line, spec) => {
  if (typeof line !== 'string') {
    return line
  }
  const splitted = line.split(rowRx)
  const obj = {}
  try {
    spec.forEach(([attr, parser], i) => {
      if (splitted[i] !== 'undefined' && splitted[i] && splitted[i].length) {
        obj[attr] = parser(splitted[i])
      }
    })
  } catch (e) {
    console.warn('Error while parsing', line, e) // eslint-disable-line no-console
    throw e
  }
  return obj
}

const mkLineParser = (doctype, attrs) => {
  const attrParsers = doctypes[doctype]
  const spec = attrs.map(attr => {
    const parser = attrParsers[attr]
    if (!parser) {
      throw new Error(
        `Cannot make line parser: attribute "${attr}" does not have a parser (doctype: ${doctype})`
      )
    }
    return [attr, parser]
  })
  return line => parseLine(line, spec)
}

const parseTable = (lines, doctype) => {
  const header = lines[0]
  const attrs = header.split(rowRx)
  const parse = mkLineParser(doctype, attrs)
  return lines.slice(1).map(parse)
}

const wrapAsFetchJSONResult = documents => {
  return {
    rows: documents.map(x => {
      if (!x._id) {
        throw new Error('doc without id' + x)
      }
      return { id: x._id, doc: x }
    })
  }
}

module.exports = {
  mkLineParser,
  parseTable,
  wrapAsFetchJSONResult
}
