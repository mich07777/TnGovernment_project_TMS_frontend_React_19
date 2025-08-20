import CrudTable from '../../../utils/CrudTable';
import { qualificationsApi } from '../../../services/qualifications_api';

const Qualifications = () => {
    return (
        <CrudTable 
            api={qualificationsApi}
            title="Qualification"
            entityName="qualification"
        />
    );
};

export default Qualifications;