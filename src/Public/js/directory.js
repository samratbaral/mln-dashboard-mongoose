// copied from https://js.devexpress.com/Demos/WidgetsGallery/Demo/FileManager/Overview/jQuery/Light/




$(function () {
    $("#file-manager").dxFileManager({
      name: "fileManager",
      fileSystemProvider: customProvider,
      currentPath: "Documents",
      rootFolderName: "Root",
      height: 450,
      permissions: {
        create: true,
        copy: true,
        move: true,
        delete: true,
        rename: true,
        download: true
      },
      onToolbarItemClick(e) {
        if (e.itemData === "delete") {
          var itemName = e.component.getSelectedItems()[0].name;
          setTimeout(function () {
            $("div.dx-filemanager-dialog-delete-item > div").attr(
              "title",
              itemName
            );
          }, 0);
        }
      },
      contextMenu: {
        items: [
          "create",
          {
            text: "Create new file",
            items: [
              {
                text: "Plain text document",
                extension: ".txt"
                // onClick: onItemClick
              },
              {
                text: "Word document",
                extension: ".doc"
                // onClick: onItemClick
              },
              {
                text: "Excel spreadsheet",
                extension: ".xls"
                // onClick: onItemClick
              }
            ]
          },
          {
            text: "Favourites",
            icon: "favorites"
          },
          {
            name: "Share",
            text: "Share",
            icon: "share",
            beginGroup: true
            // onClick: shareItem
          },
          {
            name: "Unshare",
            text: "Unshare",
            icon: "revert"
            // onClick: unshareItem
          },
          {
            name: "rename",
            beginGroup: true
          },
          {
            name: "download"
            // beginGroup: true
          },
          "move",
          "copy",
          "delete",
          "refresh",
          {
            text: "Open View in New Tab"
          }
        ]
      },
  
      customizeDetailColumns: (columns) => {
        columns.push({
          caption: "Creator",
          dataField: "dataItem.creator"
        });
        return columns;
      }
    });
  });
  
  var fileSystem = [
    {
      name: "My Folder",
      isDirectory: true,
      items: [
        {
          name: "Child1",
          isDirectory: true,
          creator: "User1",
          items: [
            {
              name: "About.rtf",
              isDirectory: false,
              creator: "User2",
              size: 1024
            },
            {
              name: "Passwords.rtf",
              isDirectory: false,
              creator: "User2",
              size: 2048
            },
            {
              name: "SubChild",
              isDirectory: true,
              creator: "User2",
              items: [
                {
                  name: "About.rtf",
                  isDirectory: false,
                  creator: "User2",
                  size: 1024
                },
                {
                  name: "Passwords.rtf",
                  isDirectory: false,
                  creator: "User2",
                  size: 2048
                }
              ]
            }
          ]
        },
        {
          name: "Child2",
          isDirectory: true,
          creator: "User1",
          items: [
            {
              name: "About2.rtf",
              isDirectory: false,
              creator: "User2",
              size: 1024
            },
            {
              name: "Passwords2.rtf",
              isDirectory: false,
              creator: "User2",
              size: 2048
            }
          ]
        },
        {
          name: "About.xml",
          isDirectory: false,
          creator: "User3",
          size: 1024
        },
        {
          name: "Managers.rtf",
          isDirectory: false,
          creator: "User4",
          size: 2048
        },
        {
          name: "ToDo.txt",
          isDirectory: false,
          creator: "User1",
          size: 3072
        }
      ]
    },
    {
      name: "Shared Folder",
      isDirectory: true,
      creator: "User1",
      items: [
        {
          name: "logo.png",
          isDirectory: false,
          creator: "User2",
          size: 20480
        },
        {
          name: "banner.gif",
          isDirectory: false,
          creator: "User2",
          size: 10240
        },
        {
          name: "Shared Child Folder",
          isDirectory: true,
          creator: "User1",
          items: [
            {
              name: "logo.png",
              isDirectory: false,
              creator: "User2",
              size: 20480
            },
            {
              name: "banner.gif",
              isDirectory: false,
              creator: "User2",
              size: 10240
            }
          ]
        }
      ]
    },
    {
      name: "Extra Folder",
      isDirectory: true,
      creator: "User5",
      items: [
        {
          name: "Employees.txt",
          isDirectory: false,
          creator: "User1",
          size: 3072
        },
        {
          name: "PasswordList.txt",
          isDirectory: false,
          creator: "User2",
          size: 5120
        }
      ]
    },
    {
      name:
        "Description _DELETEPopupbox is havingUI Issue_WhenNAMEFieldisLengthy-UserPressONDeleteButtonANDIFNAMEISLengthyThanUi isNOTRenderedProperly.rtf",
      isDirectory: false,
      creator: "User2",
      size: 1024
    },
    {
      name: "Description.txt",
      isDirectory: false,
      creator: "User4",
      size: 2048
    },
    {
      name: "Description 1.txt",
      isDirectory: false,
      creator: "User4",
      size: 2048
    }
  ];
  var objectProvider = new DevExpress.fileManagement.ObjectFileSystemProvider({
    data: fileSystem
  });
  var customProvider = new DevExpress.fileManagement.CustomFileSystemProvider({
    getItems: function (pathInfo) {
      return objectProvider.getItems(pathInfo);
    },
    renameItem: function (item, name) {
      if (item.name == "Parent1") {
        throw {
          errorId: 0,
          fileItem: item
        };
      } else return objectProvider.renameItem(item, name);
    },
    createDirectory: function (parentDir, name) {
      if (parentDir.name == "Parent1") {
        throw {
          errorId: 0,
          fileItem: item
        };
      } else return objectProvider.createDirectory(parentDir, name);
    },
    deleteItem: function (item) {
      if (item.name == "Parent1") {
        throw {
          errorId: 0,
          fileItem: item
        };
      } else return objectProvider.deleteItems([item]);
    },
    moveItem: function (item, destinationDir) {
      if (item.name == "Parent1") {
        throw {
          errorId: 0,
          fileItem: item
        };
      } else return objectProvider.moveItems([item], destinationDir);
    },
    copyItem: function (item, destinationDir) {
      if (item.name == "Parent1") {
        throw {
          errorId: 0,
          fileItem: item
        };
      } else return objectProvider.copyItems([item], destinationDir);
    },
  
    downloadItems: (items) => {
      if (items.length === 1) {
        downloadSingleFile(items[0]);
      } else {
        downloadMultipleFiles(items);
      }
    }
  });
  
  function downloadSingleFile(file) {
    var content = "This is the sample content of file";
    var downloadFileName = "Download.txt";
  
    setFileContent(file, content);
  
    content = getFileContent(file);
  
    const byteString = window.atob(content);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
    saveAs(blob, downloadFileName);
  }
  
  function downloadMultipleFiles(files) {
    var content = "This is the sample content of file";
    var downloadFileName = "Download.zip";
  
    files.forEach((item, index) => {
      setFileContent(item, content + index);
    });
  
    const zip = new JSZip();
  
    files.forEach((file) =>
      zip.file(file.name, getFileContent(file), { base64: true })
    );
  
    const options = {
      type: "blob",
      compression: "DEFLATE",
      mimeType: "application/zip"
    };
    const deferred = $.Deferred();
  
    if (zip.generateAsync) {
      zip.generateAsync(options).then(deferred.resolve);
    } else {
      deferred.resolve(zip.generate(options));
    }
  
    deferred.done((blob) => saveAs(blob, null, downloadFileName));
  }
  
  function getFileContent(file) {
    return file.dataItem.dataItem.content || "";
  }
  
  function setFileContent(file, content) {
    file.dataItem.dataItem.content = btoa(content);
  }