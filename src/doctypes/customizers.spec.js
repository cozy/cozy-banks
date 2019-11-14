import { schemaCustomizer } from './customizers'
import mergeWith from 'lodash/mergeWith'

describe('customizer from schema', () => {
  it('should error on unknown types', () => {
    expect(() =>
      schemaCustomizer({
        type: 'unknownContainerType',
        attributes: {
          name: {
            conflictResolution: 'user'
          }
        }
      })
    ).toThrow('unknownContainerType is not a valid type')
  })

  describe('merging', () => {
    const setup = ({ schema, serverDoc, userDoc }) => {
      const customizer = schemaCustomizer(schema)
      const mergedDoc = mergeWith(serverDoc, userDoc, customizer)
      return {
        mergedDoc,
        customizer
      }
    }

    const personSchema = {
      attributes: {
        name: {
          conflictResolution: 'user'
        }
      }
    }

    const bookSchema = {
      attributes: {
        authors: {
          idAttribute: 'id',
          type: 'array',
          ...personSchema
        }
      }
    }

    const userHomer = {
      name: 'homer',
      age: 45,
      id: 'homer'
    }

    const serverHomer = {
      name: 'homer simpson',
      age: 46,
      id: 'homer'
    }

    it('should support merging objects', () => {
      const { mergedDoc } = setup({
        schema: personSchema,
        userDoc: userHomer,
        serverDoc: serverHomer
      })
      expect(mergedDoc).toEqual({
        age: 46, // from server
        name: 'homer', // from user
        id: 'homer'
      })
    })

    it('should support merging arrays', () => {
      const { mergedDoc } = setup({
        schema: bookSchema,
        userDoc: { authors: [userHomer] },
        serverDoc: { authors: [serverHomer] }
      })
      expect(mergedDoc).toEqual({
        authors: [
          {
            id: 'homer',
            age: 46, // from server
            name: 'homer' // from user
          }
        ]
      })
    })
  })
})
