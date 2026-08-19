Tabel in VIC-stijl: groene headerbalk, witte/zachtgroene rijen, donkerblauwe tekst — voor data in slides en documenten.

```jsx
<DataTable
  columns={['Invalshoek', 'Activiteit', 'Status']}
  rows={[
    ['Water', 'Klimaatslootjes', 'Lopend'],
    ['Bodem', 'Greppelinfiltratie', 'Afgerond'],
  ]}
/>
```

Rijen klikbaar maken: geef `onRowClick` mee — de rij wordt dan ook met Enter/spatie
bedienbaar (`role="button"`, zichtbare focus) en niet alleen met de muis. `rowKey` en
`rowClassName` zijn optioneel, voor een stabiele sleutel per rij en een eigen markering:

```jsx
<DataTable
  columns={['Invalshoek', 'Activiteit', 'Status']}
  rows={rijen}
  rowKey={(row) => row[0]}
  rowClassName={(row) => (row[0] === gekozen ? 'rij-geselecteerd' : undefined)}
  onRowClick={(row) => setGekozen(row[0])}
/>
```
