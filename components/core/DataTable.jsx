import React from 'react';

/**
 * Tabel in VIC-stijl (naar het PPT-sjabloon): groene headerbalk,
 * witte en zachtgroene rijen, donkerblauwe celtekst.
 */
export function DataTable({ columns = [], rows = [], style }) {
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      ...style,
    }}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i} style={{
              background: 'var(--vic-green)',
              color: 'var(--text-inverse)',
              textAlign: 'left',
              fontWeight: 700,
              padding: '10px 14px',
              borderRight: i < columns.length - 1 ? '1px solid rgba(255,255,255,0.35)' : 'none',
            }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r} style={{ background: r % 2 === 1 ? 'var(--vic-green-pale)' : 'var(--vic-white)' }}>
            {row.map((cell, c) => (
              <td key={c} style={{
                color: 'var(--text-body-blue)',
                padding: '9px 14px',
                borderBottom: '1px solid var(--vic-border)',
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
