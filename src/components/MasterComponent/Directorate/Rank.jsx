import CrudTable from '../../../utils/CrudTable';
import { rankApi } from '../../../services/rank_api';

const Rank = () => {
  return (
    <CrudTable 
      api={rankApi}
      title="Rank"
      entityName="rank"
    />
  );
};

export default Rank;
