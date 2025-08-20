import CrudTable from '../../../utils/CrudTable';
import { statusApi } from '../../../services/statusApi';

const Status = () => {
  return (
    <CrudTable 
      api={statusApi}
      title="Status"
      entityName="status"
    />
  );
};

export default Status;
