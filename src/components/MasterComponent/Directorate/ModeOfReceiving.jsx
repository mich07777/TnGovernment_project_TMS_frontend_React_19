import CrudTable from '../../../utils/CrudTable';
import { ModeOfReceivingApi } from '../../../services/modeofreceiving_api';

const ModeOfReceiving = () => {
    return (
        <CrudTable 
            api={ModeOfReceivingApi}
            title="Mode of Receiving"
            entityName="ModeofReceiving"
        />
    );
};

export default ModeOfReceiving;