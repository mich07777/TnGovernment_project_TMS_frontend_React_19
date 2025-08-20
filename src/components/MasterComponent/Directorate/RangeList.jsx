import React from 'react';
import CrudTable from '../../../utils/CrudTable';
import { rangeApi } from '../../../services/rangeApi';

const RangeList = () => {
  return (
    <CrudTable
      api={rangeApi}
      title="Range"
      entityName="range"
    />
  );
};

export default RangeList;
