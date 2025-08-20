import CrudTable from '../../../utils/CrudTable';
import { sexApi } from '../../../services/sexApi';

const SexList = () => {
  return (
    <CrudTable 
      api={sexApi}
      title="Sex"
      entityName="sex"
    />
  );
};

export default SexList;
