# Operator Shell Template

Template React autonomo ricavato dallo screenshot di riferimento. Contiene soltanto:

- barra superiore con identità HMI, connessione e stati macchina;
- barra laterale configurabile;
- area centrale vuota destinata alle pagine generate in seguito.

La voce `Main` apre il template collegato `linked/main-menu-popup`, mantenuto nella cartella del proprio template padre. Le altre voci continuano a selezionare direttamente una sezione.

Gli stati visualizzati sono dati di anteprima definiti in `src/templateData.js`. Il componente riutilizzabile è `src/OperatorShellTemplate.jsx` e riceve `machineStates`, `navigationItems`, `connection`, `userName`, `mainMenuItems` e `children` tramite props.

## Avvio

```powershell
pnpm install
pnpm run dev
```
