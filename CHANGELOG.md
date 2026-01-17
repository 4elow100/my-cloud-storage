# Changelog

## Содержание

- [v0.2.0](#v020)
- [v0.1.0](#v010)
- [v0.0.1 - Initial version](#v001)

---

## Список версий:

<details id="v020" open>
<summary><strong><em>v0.2.0</em></strong></summary>

<p>Доработка интерфейса и API</p>
<p>Подробнее:</p>

- <details>
  <summary><em>Backend</em></summary>

    - При создании папки добавлена проверка ее имени на содержание символа "/"
    - При загрузке файла на сервер добавлена проверка принадлежности этой папки пользователю
    - `FoldersAPIView`:
      - Переработан обработчик GET-запроса
    - `FileAPIView` заменен на `FileViewSet`
    - Добавлены возможности получать или скачивать файл по ссылке, создавать и удалять файл
    - Добавлена возможность создавать папки и файлы внутри других папок
    - Добавлено изменение формата даты в сериализаторе файла
    - Добавлено поле отформатированного значения размера файла

  </details>

- <details>
  <summary><em>Frontend</em></summary>

    - Немного доработаны стили
    - Заполнена главная страница
    - Реализованы:
      - UI-компоненты:
        - `FileStorageItem`, `FolderStorageItem`, `FileRow`, `FolderRow`, `CreateFolderModal`, `UploadFileModal`
      - Логика:
        - Модуль `validate`
    - Переработаны реализации отображения файлов и папок в зависимости от типа
    - Добавлена возможность создавать папки и файлы внутри других папок
    - Добавлена возможность удалять файлы
    - Добавлена возможность создавать файлы с комментариями
    - Изменение иконки элемента в зависимости от его типа или расширения
    - Автоматическая загрузка и отображение содержимого хранилища и папок
    - Обработчики кликов вынесены в компонент хранилища
    - В компонентах логина и регистрации добавлена привязка запроса к введенным данным в полях
    - Добавлена валидация данных при регистрации согласно ТЗ

  </details>

</details>

---

<details id="v010">
<summary><strong><em>v0.1.0</em></strong></summary>

<p>Начальный интерфейс приложения</p>
<p>Подробнее:</p>

- <details>
  <summary><em>Backend</em></summary>

    - Добавлены зависимости в файл requirements.txt

  </details>

- <details>
  <summary><em>Frontend</em></summary>

    - Реализованы:
      - UI-компоненты:
        - `CreateItemButton`, `FileContextMenu`, `FolderContextMenu`, `GridView`, `ListView`, `ListRow`,
            `SearchField`, `UserProfileButton`
      - Логика:
        - Функция `getFileIcon()`
    - Реализованы два типа отображения файлов
    - Добавлено тестовое контекстное меню
    - Добавлена переадресация на страницу хранилища пользователя при нажатии на его иконку, 
      при условии успешной авторизации на сайте
    - Различные улучшения отображения компонентов

  </details>

</details>

---

<details id="v001">
<summary><strong><em>v0.0.1 - Initial version</em></strong></summary>

<p>Инициализация приложения</p>
<p>Подробнее:</p>

- <details>
  <summary><em>Backend</em></summary>

    - Создан проект <em>Django</em>
    - Созданы приложения `users` и `storage`
    - Константы настроек вынесены в <em>.env</em>
    - Маршруты приложений централизованы через <em>./apps/</em>
    - Настроен CORS для взаимодействия фронтенда и бэкенда
    - Изменения в приложениях:
        - <details>
          <summary><em>storage</em></summary>

            - Добавлена модели: 
              - `File`, `Folder`
            - Добавлены сериализаторы:
                - `CreateFolderSerializer`, `FolderSerializer`, `FileSerializer`
            - Добавлены обработчики запросов:
                - `FoldersAPIView`, `GetFolderAPIView`, `UploadFileAPIView`

          </details>

        - <details>
          <summary><em>users</em></summary>

            - Добавлена модель `UserProfile`
            - Добавлен сериализатор `RegistrationSerializer`
            - Добавлены обработчики запросов:
              - `RegistrationAPIView`, `LoginAPIView`, `LogoutAPIView`, `MeAPIView`
          
          </details>

  </details>

- <details>
  <summary><em>Frontend</em></summary>

    - Создан проект <em>ReactJs</em>
    - Реализованы:
      - UI-компоненты:
        - `Modal`, `StorageItem`, `LoginModal`, `RegistrationModal`, `Logo`, `MainHeader`,
            `RequireAuth`, `UploadFileButton`, `HomePage`, `StoragePage`
      - Логика:
        - Контекст `AuthProvider`, пользовательский хук `useAuth()`, функция `getCookie()`
      - Страницы приложения: 
        - `HomePage`, `StoragePage`
    - Настроен тестовый шаблон для проверки логики входа, выхода и регистрации пользователя,
      а также загрузки файла на сервер
    - Настроена навигация приложения с учетом авторизации пользователя
    - Константа адреса сервера вынесена в <em>.env</em>

  </details>

</details>

---

