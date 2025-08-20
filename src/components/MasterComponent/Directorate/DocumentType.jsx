import CrudTable from '../../../utils/CrudTable';
import { DocumentTypeApi } from '../../../services/documenttype_api';

const DocumentType = () => {
    return (
        <CrudTable 
            api={DocumentTypeApi}
            title="Document Type"
            entityName="DocumentType"
        />
    );
};

export default DocumentType;