import CrudTable from '../../../utils/CrudTable';
import { courseAttendedCenterApi } from '../../../services/courseAttendedCenterApi';

const CourseAttendedCenter = () => {
  return (
    <CrudTable 
      api={courseAttendedCenterApi}
      title="Course Attended Center"
      entityName="course attended center"
    />
  );
};

export default CourseAttendedCenter;
