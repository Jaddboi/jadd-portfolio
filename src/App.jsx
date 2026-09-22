import { SystemProvider, useSystem } from './system/SystemProvider.jsx'
import { IconDefs } from './shared/icons.jsx'
import { Wallpaper } from './shell/Wallpaper.jsx'
import { TopBar } from './shell/TopBar.jsx'
import { Desktop } from './shell/Desktop.jsx'
import { Window } from './shell/Window.jsx'
import { Dock } from './shell/Dock.jsx'
import { Notification } from './shell/Notification.jsx'
import { Toast } from './shell/Toast.jsx'
import { BootScreen } from './shell/BootScreen.jsx'
import { Files } from './apps/Files.jsx'
import { Terminal } from './apps/Terminal.jsx'
import { TextEditor } from './apps/TextEditor.jsx'
import { ImageViewer } from './apps/ImageViewer.jsx'
import { DocumentViewer } from './apps/DocumentViewer.jsx'
import { Contacts } from './apps/Contacts.jsx'
import './App.css'

const APP_CONTENTS = {
  files: Files,
  terminal: Terminal,
  editor: TextEditor,
  viewer: ImageViewer,
  docs: DocumentViewer,
  contacts: Contacts,
}

export default function App() {
  return (
    <SystemProvider>
      <Screen />
    </SystemProvider>
  )
}

function Screen() {
  const { windows, booting } = useSystem()
  return (
    <div className="shell">
      <IconDefs />
      <Wallpaper />
      <TopBar />
      <main className="desktop-area">
        <Desktop />
        {windows.map((win) => {
          const AppContents = APP_CONTENTS[win.app]
          return (
            <Window key={win.id} win={win}>
              <AppContents win={win} />
            </Window>
          )
        })}
      </main>
      <Dock />
      <Notification />
      <Toast />
      {booting && <BootScreen />}
    </div>
  )
}
