# Changelog

## Содержание

- [v0.1.0](#v010)
- [v0.0.1 - Initial version](#v001)

---

## Список версий:

<details id="v010" open>
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

