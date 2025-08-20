import CrudTable from '../../../utils/CrudTable';
import { trainingCenterApi } from '../../../services/trainingCenter_api';

const TrainingCenterList = () => {
  return (
    <CrudTable 
      api={trainingCenterApi}
      title="Training Center"
      entityName="training center"
    />
  );
};

export default TrainingCenterList;
