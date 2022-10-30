import { Typebot, Variable } from 'models'
import { WritableDraft } from 'immer/dist/types/types-external'
import { SetTypebot } from '../TypebotContext'
import { produce } from 'immer'

export type VariablesActions = {
  createVariable: (variable: Variable) => void
  updateVariable: (
    variableId: string,
    updates: Partial<Omit<Variable, 'id'>>
  ) => void
  deleteVariable: (variableId: string) => void
}

export const variablesAction = (setTypebot: SetTypebot): VariablesActions => ({
  createVariable: (newVariable: Variable) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        typebot.variables.push(newVariable)
      })
    ),
  updateVariable: (
    variableId: string,
    updates: Partial<Omit<Variable, 'id'>>
  ) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        typebot.variables = typebot.variables.map((v) =>
          v.id === variableId ? { ...v, ...updates } : v
        )
      })
    ),
  deleteVariable: (itemId: string) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        deleteVariableDraft(typebot, itemId)
      })
    ),
})

export const deleteVariableDraft = (
  typebot: WritableDraft<Typebot>,
  variableId: string
) => {
  const index = typebot.variables.findIndex((v) => v.id === variableId)
  typebot.variables.splice(index, 1)
}
