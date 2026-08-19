import React from 'react';

/**
 * Tabel in VIC-stijl (naar het PPT-sjabloon): groene headerbalk,
 * witte en zachtgroene rijen, donkerblauwe celtekst.
 * Styling komt uit components.css (tokens).
 *
 * Rijen zijn optioneel klikbaar via onRowClick — dan wordt de rij ook met
 * Enter/spatie bedienbaar (role="button", tabIndex) en krijgt hij zichtbare
 * focus. Zonder onRowClick blijft een rij een gewone <tr> (backwards compatibel).
 */
export function DataTable({ columns = [], rows = [], onRowClick, rowKey, rowClassName, className, style }) {
  const clickable = typeof onRowClick === 'function';

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
      rows.map((row, r) => {
        const key = rowKey ? rowKey(row, r) : r;
        const extraClass = rowClassName ? rowClassName(row, r) : undefined;
        const rowProps = {
          key,
          className: [clickable ? 'vic-table__row--clickable' : null, extraClass].filter(Boolean).join(' ') || undefined,
        };

        if (clickable) {
          rowProps.tabIndex = 0;
          rowProps.role = 'button';
          rowProps.onClick = () => onRowClick(row, r);
          rowProps.onKeyDown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onRowClick(row, r);
            }
          };
        }

        return React.createElement(
          'tr',
          rowProps,
          row.map((cell, c) => React.createElement('td', { key: c }, cell))
        );
      })
    )
  );
}
