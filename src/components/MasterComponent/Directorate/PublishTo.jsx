import CrudTable from '../../../utils/CrudTable';
import { publishToApi } from '../../../services/publish_to_api';

const PublishTo = () => {
    return (
        <CrudTable 
            api={publishToApi}
            title="Publish To"
            entityName="publishTo"
        />
    );
};

export default PublishTo;
