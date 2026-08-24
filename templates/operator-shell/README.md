# Operator Shell Template

Template React autonomo ricavato dallo screenshot di riferimento. Contiene soltanto:

- barra superiore con identità HMI, connessione e stati macchina;
- barra laterale configurabile;
- area centrale vuota destinata alle pagine generate in seguito.

La voce `Main` apre il template collegato `linked/main-menu-popup`. La voce `Alarms` apre `linked/alarms-menu-popup`: entrambe le scelte del popup riutilizzano `alarm-list`, passando rispettivamente la modalità `alarms` o `history`.

La voce `Manuals` apre `linked/manuals-menu-popup`. Le cinque selezioni sono esposte tramite callback e restano scollegate da pagine specifiche finché non verranno definiti i relativi template.

La voce `Diagnostic` apre `linked/diagnostic-menu-popup`, con le scelte
`Diagnostic Zone` e `Diagnostic Device` esposte tramite callback.

Gli stati visualizzati sono dati di anteprima definiti in `src/templateData.js`. Il componente riutilizzabile è `src/OperatorShellTemplate.jsx` e riceve `machineStates`, `navigationItems`, `connection`, `userName`, i dati dei menu collegati e `children` tramite props.

## Avvio

```powershell
pnpm install
pnpm run dev
```
