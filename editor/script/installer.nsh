!include nsDialogs.nsh
!include LogicLib.nsh
#OutFile nsDialogs.exe
#RequestExecutionLevel user
#ShowInstDetails show



Section
SectionEnd

Var Dialog
Var name
Var age

Page custom pgPageCreate pgPageLeave
Function pgPageCreate

    nsDialogs::Create 1018
    Pop $Dialog

    ${If} $Dialog == error
        Abort
    ${EndIf}

    ${NSD_CreateGroupBox} 10% 10u 80% 100u "Settings"
    Pop $0

        ${NSD_CreateLabel} 20% 26u 20% 10u "name:"
        Pop $0

        ${NSD_CreateText} 40% 24u 40% 12u "electron"
        Pop $name

        ${NSD_CreateLabel} 20% 40u 20% 10u "age:"
        Pop $0

        ${NSD_CreateText} 40% 38u 40% 12u "12345"
        Pop $age

    nsDialogs::Show
FunctionEnd

Function PgPageLeave
    ${NSD_GetText} $name $0
    ${NSD_GetText} $age $1

    FileOpen $9 $INSTDIR\conf.json w
    FileWrite $9 '{"name":"$0","age":"$1"}'
    FileClose $9
    SetFileAttributes $INSTDIR\conf.json NORMAL
FunctionEnd