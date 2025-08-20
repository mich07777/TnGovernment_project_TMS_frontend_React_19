import CrudTable from '../../../utils/CrudTable';
import { locationsApi } from '../../../services/location_api';

const Locations = () => {
    return (
        <CrudTable 
            api={locationsApi}
            title="Location"
            entityName="location"
        />
    );
};

export default Locations;