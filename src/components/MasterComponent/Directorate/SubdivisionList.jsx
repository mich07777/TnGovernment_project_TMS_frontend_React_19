import React from 'react';
import CrudTable from '../../../utils/CrudTable';
import { subdivisionApi } from '../../../services/subdivisionApi';

const SubdivisionList = () => {
  return (
    <CrudTable
      api={subdivisionApi}
      title="Subdivision"
      entityName="subdivision"
    />
  );
};

export default SubdivisionList;
