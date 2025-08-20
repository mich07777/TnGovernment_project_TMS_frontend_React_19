import CrudTable from '../../../utils/CrudTable';
import { unitsApi } from '../../../services/unitsApi';

const Units = () => {
  return (
    <CrudTable 
      api={unitsApi}
      title="Unit"
      entityName="unit"
    />
  );
};

export default Units;
