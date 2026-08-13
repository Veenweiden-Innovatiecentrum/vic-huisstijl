import React from 'react';

/**
 * Tabel in VIC-stijl (naar het PPT-sjabloon): groene headerbalk,
 * witte en zachtgroene rijen, donkerblauwe celtekst.
 * Styling komt uit components.css (tokens).
 */
export function DataTable({ columns = [], rows = [], className, style }) {
  return React.createElement(
    'table',
    { className: ['vic-table', className].filter(Boolean).join(' '), style },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        columns.map((c, i) => React.createElement('th', { key: i }, c))
      )
    ),
    React.createElement(
      'tbody',
      null,
      rows.map((row, r) =>
        React.createElement(
          'tr',
          { key: r },
          row.map((cell, c) => React.createElement('td', { key: c }, cell))
        )
      )
    )
  );
}
