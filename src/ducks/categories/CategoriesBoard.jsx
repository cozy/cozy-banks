import React from 'react'
import { Table } from 'components/Table'
import { translate } from 'cozy-ui/react/I18n'
import Category from './Category'
import styles from './CategoriesBoard.styl'

const CategoriesBoard = ({ t, categories }) => (
  <Table className={styles['bnk-table-category']}>
    <thead>
      <tr>
        <td className={styles['bnk-table-category-category']}>{t('Categories.headers.categories')}</td>
        <td className={styles['bnk-table-percentage']}>%</td>
        <td className={styles['bnk-table-operation']}>{t('Categories.headers.operations')}</td>
        <td className={styles['bnk-table-total']}>{t('Categories.headers.total')}</td>
        <td className={styles['bnk-table-amount']}>{t('Categories.headers.credit')}</td>
        <td className={styles['bnk-table-amount']}>{t('Categories.headers.debit')}</td>
        <td className={styles['bnk-table-chevron']} />
      </tr>
    </thead>
    {categories.map(category => <Category category={category} />)}
  </Table>
)

export default translate()(CategoriesBoard)
