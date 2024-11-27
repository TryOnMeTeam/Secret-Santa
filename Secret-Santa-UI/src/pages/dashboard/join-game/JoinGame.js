import React from 'react';
import { ListTableColumn } from '../../../models/ListTableColumn';
import ListTable from '../../list-table/ListTable';

function JoinGame() {

  const columns = [
    new ListTableColumn('name', 'Product Name', 100),
    new ListTableColumn('productLink', 'Product Link', 200)
  ];

  const actions = [
    {
      label: 'Add New Products',
      onClick: () => alert('Add New clicked'),
      disabled: false,
    }
  ];

  const rows = [
    {
      name: 'Product 1',
      productLink: 'https://example.com/product1',
    },
    {
      name: 'Product 2',
      productLink: 'https://example.com/product2',
    },
    {
      name: 'Product 3',
      productLink: 'https://example.com/product3',
    },
    {
      name: 'Product 4',
      productLink: 'https://example.com/product4',
    },
    {
      name: 'Product 5',
      productLink: 'https://example.com/product5',
    }
  ];
  

  return (
    <div>
      <ListTable columns={columns} rows={rows} actionButtons={actions} />
    </div>
  )
}

export default JoinGame