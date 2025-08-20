import CrudTable from '../../../utils/CrudTable';
import { splunitsApi } from '../../../services/splunitsApi';

const SplUnits = () => {
  return (
    <CrudTable 
      api={splunitsApi}
      title="Special Units"
      entityName="splunit"
    />
  );
};

export default SplUnits;
