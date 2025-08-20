import React from 'react';
import CrudTable from '../../../utils/CrudTable';
import { cityApi } from '../../../services/cityApi';

const CityList = () => {
  return (
    <CrudTable
      api={cityApi}
      title="City"
      entityName="city"
    />
  );
};

export default CityList;
