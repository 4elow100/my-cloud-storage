import {useState} from "react";
import {ListView} from "../components/views/listView/ListView.jsx";
import {GridView} from "../components/views/gridView/GridView.jsx";
import {FileContextMenu} from "../components/contextMenus/FileContextMenu.jsx";
import {FolderContextMenu} from "../components/contextMenus/FolderContextMenu.jsx";
import {CreateItemButton} from "../components/common/CreateItemButton.jsx";


const testData = [
  {
    id: 1,
    name: "Name1",
    size: "155KB",
    uploaded_at: "01.01.01 11:55",
    last_download: "01.01.01 11:55",
    comment: "FILE1",
    isFolder: true
  },
  {
    id: 2,
    name: "Name2",
    size: "222KB",
    uploaded_at: "02.02.02 12:55",
    last_download: "02.02.02 12:55",
    comment: "FILE2",
    isFolder: true
  },
  {
    id: 3,
    name: "Name3",
    size: "333KB",
    uploaded_at: "03.03.03 13:55",
    last_download: "03.03.03 13:55",
    comment: "FILE3",
    isFolder: true
  },
  {
    id: 4,
    name: "Name4",
    size: "44KB",
    uploaded_at: "04.04.04 14:55",
    last_download: "04.04.04 14:55",
    comment: "FILE4",
    isFolder: true
  },
  {
    id: 5,
    name: "Name5",
    size: "555KB",
    uploaded_at: "05.05.05 15:55",
    last_download: "05.05.05 15:55",
    comment: "FILE5",
    isFolder: true
  },
  {
    id: 6,
    name: "Name6",
    size: "6KB",
    uploaded_at: "06.06.06 16:55",
    last_download: "06.06.06 16:55",
    comment: "FILE6",
    isFolder: true
  },
  {
    id: 7,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 8,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 9,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 10,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 11,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 12,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 13,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 14,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 15,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 16,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 17,
    name: "Name7",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: true
  },
  {
    id: 18,
    name: "Name7.txt",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: false
  },
  {
    id: 19,
    name: "Name7.pdf",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: false
  },
  {
    id: 20,
    name: "Name7.gif",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: false
  },
  {
    id: 21,
    name: "Name7.mp4",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: false
  },
  {
    id: 22,
    name: "Name7.mp3",
    size: "7777KB",
    uploaded_at: "07.07.07 17:55",
    last_download: "07.07.07 17:55",
    comment: "FILE7",
    isFolder: false
  },
]


export const StoragePage = () => {
  const [currentView, setView] = useState('list')
  const [contextMenuVisibility, setContextMenuVisibility] = useState(false)
  const [contextMenuType, setContextMenuType] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState({left: 0, top: 0})

  const onContextMenu = (e) => {
    e.preventDefault()

    if (contextMenuVisibility) setContextMenuVisibility(false)

    setContextMenuPosition({
      left: e.clientX,
      top: e.clientY
    })

    if (e.target.closest(".item-type-file")) {
      setContextMenuType('file')
    }

    if (e.target.closest(".item-type-folder")) {
      setContextMenuType('folder')
    }

    setContextMenuVisibility(true)
  }

  const handleClick = (e) => {
    if (!e.target.closest(".context-menu-container")) {
      setContextMenuVisibility(false)
    }
  }

  return (
    <>
      <div className="storage-container" onClick={handleClick}>
        <header className="storage-header">
          <span className="storage-header-title">Файлы</span>
          <div className="storage-header-actions">
            <CreateItemButton />
            <select className="view-select" name="select storage view"
                    onChange={e => setView(e.target.value)}>
              <option className="view-option" value="list">List</option>
              <option className="view-option" value="grid">Grid</option>
            </select>
          </div>
        </header>
        <div className="storage-content">
          {currentView === 'list' && <ListView data={testData}/>}
          {currentView === 'grid' && <GridView data={testData} onContextMenu={onContextMenu}/>}
        </div>
        {contextMenuVisibility && contextMenuType === 'file' && (<FileContextMenu style={contextMenuPosition}/>)}
        {contextMenuVisibility && contextMenuType === 'folder' && (<FolderContextMenu style={contextMenuPosition}/>)}
      </div>
    </>
  )
}