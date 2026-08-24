# Operator Shell Template

Template React autonomo ricavato dallo screenshot di riferimento. Contiene soltanto:

- barra superiore con identità HMI, connessione e stati macchina;
- barra laterale configurabile;
- area centrale vuota destinata alle pagine generate in seguito.

La voce `Main` apre il template collegato `linked/main-menu-popup`. La voce `Alarms` apre `linked/alarms-menu-popup`: entrambe le scelte del popup riutilizzano `alarm-list`, passando rispettivamente la modalità `alarms` o `history`.

Gli stati visualizzati sono dati di anteprima definiti in `src/templateData.js`. Il componente riutilizzabile è `src/OperatorShellTemplate.jsx` e riceve `machineStates`, `navigationItems`, `connection`, `userName`, `mainMenuItems`, `alarmMenuItems` e `children` tramite props.

## Avvio

```powershell
pnpm install
pnpm run dev
```
