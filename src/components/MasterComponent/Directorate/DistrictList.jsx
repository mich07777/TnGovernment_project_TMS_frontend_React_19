import React from 'react';
import CrudTable from '../../../utils/CrudTable';
import { districtApi } from '../../../services/districtApi';

const DistrictList = () => {
  return (
    <CrudTable
      api={districtApi}
      title="District"
      entityName="district"
    />
  );
};

export default DistrictList;
