import CrudTable from '../../../utils/CrudTable';
import { zoneApi } from '../../../services/zoneApi';

const Zones = () => {
  return (
    <CrudTable 
      api={zoneApi}
      title="Zone"
      entityName="zone"
    />
  );
};

export default Zones;
