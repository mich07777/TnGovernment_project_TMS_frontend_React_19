import CrudTable from '../../../utils/CrudTable';
import { courseTypeApi } from '../../../services/courseTypeApi';

const CourseType = () => {
  return (
    <CrudTable 
      api={courseTypeApi}
      title="Course Type"
      entityName="course type"
    />
  );
};

export default CourseType;
