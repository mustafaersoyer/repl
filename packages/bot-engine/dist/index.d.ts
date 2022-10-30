import { CSSProperties } from 'react';
import { PublicTypebot, Edge, Answer, VariableWithValue, Variable } from 'models';
import { Log } from 'db';
export * from 'util';

declare type TypebotViewerProps = {
    typebot: Omit<PublicTypebot, 'updatedAt' | 'createdAt'>;
    isPreview?: boolean;
    apiHost?: string;
    style?: CSSProperties;
    predefinedVariables?: {
        [key: string]: string | undefined;
    };
    resultId?: string;
    startGroupId?: string;
    isLoading?: boolean;
    onNewGroupVisible?: (edge: Edge) => void;
    onNewAnswer?: (answer: Answer & {
        uploadedFiles: boolean;
    }) => Promise<void>;
    onNewLog?: (log: Omit<Log, 'id' | 'createdAt' | 'resultId'>) => void;
    onCompleted?: () => void;
    onVariablesUpdated?: (variables: VariableWithValue[]) => void;
};
declare const TypebotViewer: ({ typebot, apiHost, isPreview, isLoading, style, resultId, startGroupId, predefinedVariables, onNewLog, onNewGroupVisible, onNewAnswer, onCompleted, onVariablesUpdated, }: TypebotViewerProps) => JSX.Element;

declare const parseVariables: (variables: Variable[], options?: {
    fieldToParse?: 'value' | 'id';
    escapeForJson?: boolean;
}) => (text: string | undefined) => string;

export { TypebotViewer, TypebotViewerProps, parseVariables };
