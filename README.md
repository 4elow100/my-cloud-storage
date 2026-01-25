# Дипломный проект по профессии «Fullstack-разработчик на Python»

## Облачное хранилище My Cloud

Группа: FPY-100

## Содержание

- [Описание структуры проекта](#описание-структуры-проекта)
- [Архитектура и компоненты](#архитектура-и-компоненты)
- [Инструкция по развертыванию приложения на сервисе reg.ru](#инструкция-по-развертыванию-приложения-на-сервисе-regru)
- [Полезные ссылки](#полезные-ссылки)
  - [Ссылки на развернутое приложение](#ссылки-на-развернутое-приложение)
  - [Frontend (React)](#frontend-react)
  - [Backend (Python / Django)](#backend-python--django)


---

# Описание структуры проекта

<details open>
<summary><code><strong>backend/</strong></code> - <em>проект сервера на Django</em></summary>

  - <details>
    <summary><code>apps/</code> - <em>пакет приложений</em></summary>
  
    - <details>
      <summary><code>storage/</code> - <em>приложение управления хранилищем</em></summary>
      
      - `migrations/` - _миграции приложения_
      - `__init__.py` - _инициализация модуля_
      - `admin.py` - _настройка административного интерфейса Django_
      - `admin_urls.py` - _пути доступа к чужому хранилищу_
      - `apps.py` - _регистрация приложения_
      - `models.py` - _модели приложения_
      - `serializers.py` - _сериализаторы_
      - `tests.py` - _тесты приложения_
      - `urls.py` - _основные пути запросов_
      - `views.py` - _обработчики запросов_
      
      </details>

    - <details>
      <summary><code>users</code> - <em>приложение управления пользователями</em></summary>
      
      - `migrations/` - _миграции приложения_
      - `__init__.py` - _инициализация модуля_
      - `admin.py` - _настройка административного интерфейса Django_
      - `apps.py` - _регистрация приложения_
      - `models.py` - _модели приложения_
      - `serializers.py` - _сериализаторы_
      - `tests.py` - _тесты приложения_
      - `urls.py` - _основные пути запросов_
      - `views.py` - _обработчики запросов_
        
      </details>
    
    - `__init__.py` - _инициализация пакета приложений_
    - `urls.py` - _сбор маршрутов приложений_
      
    </details>

  - <details>
    <summary><code>backend/</code> - <em>главная конфигурация проекта Django</em></summary>

    - <details>
      <summary><code>settings/</code> - <em>модуль настроек проекта</em></summary>
    
      - `__init__.py` - _инициализация модуля_
      - `base.py` - _базовые настройки_
      - `dev.py` - _настройки в режиме разработки_
      - `prod.py` - _настройки для рабочего режима_
      
      </details>

    - `__init__.py` - _инициализация модуля_
    - `asgi.py` - _точка входа для ASGI-сервера_
    - `urls.py` - _основные маршруты запросов проекта_
    - `utils.py` - _шаблонизация ответов ошибок на запросы_
    - `wsgi.py` - _точка входа для WSGI-сервера_
      
    </details>

  - <details>
    <summary><code>middleware/</code> - <em>кастомные Django middleware</em></summary>

      - `__init__.py` - _инициализация модуля_
      - `middleware.py` - _middleware для логирования_

    </details>

  - `.env.example` - _пример файла окружения_
  - `manage.py` - _файл запуска проекта Django_
  - `requirements.txt` - _зависимости проекта Django_

</details>


<details open>
<summary><code><strong>frontend/</strong></code> - <em>проект фронтенда на React</em></summary>

  - <details>
    <summary><code>public/</code> - <em>статические файлы</em></summary>
    
      - `my-cloud.svg` - _иконка приложения_

    </details>

  - <details>
    <summary><code>src/</code> - <em>исходный код проекта</em></summary>
    
      - <details>
        <summary><code>app/</code> - <em>главный компонент приложения</em></summary>
        
          - `App.css` - _стили приложения_
          - `App.jsx` - _главный компонент приложения_
    
        </details>
    
      - <details>
        <summary><code>components/</code> - <em>компоненты приложения</em></summary>
        
          - <details>
            <summary><code>buttons/</code> - <em>кнопки</em></summary>
            
              - `AdminPageButton.jsx` - _переход на административный интерфейс_
              - `CreateItemButton.jsx` - _создание элемента (папки)_
              - `UploadFileButton.jsx` - _загрузка файла_
              - `UserProfileButton.jsx` - _профиль пользователя_
    
            </details>
    
          - <details>
            <summary><code>common/</code> - <em>общие компоненты</em></summary>
            
              - `Button.jsx` - _кнопка_
              - `ContextMenu.jsx` - _контекстное меню_
              - `Modal.jsx` - _модельное окно_
              - `RequireAdmin.jsx` - _разрешение доступа только администраторам_
              - `RequireAuth.jsx` - _разрешение доступа только аутентифицированным_
    
            </details>
    
          - <details>
            <summary><code>contextMenus/</code> - <em>компоненты контекстных меню</em></summary>
            
              - `AdminUsersContextMenu.jsx` - _меню пользователя в административном интерфейсе_
              - `FileContextMenu.jsx` - _меню файла_
              - `FolderContextMenu.jsx` - _меню папки_
    
            </details>
    
          - <details>
            <summary><code>modals/</code> - <em>компоненты модальных окон</em></summary>
            
              - `ChangeIsStaffModal.jsx` - _изменение признака администратора_
              - `ConfirmModal.jsx` - _подтверждение действия_
              - `CreateFolderModal.jsx` - _создание папки_
              - `DeleteConfirmModal.jsx` - _подтверждение удаления_
              - `ItemDetailsModal.jsx` - _свойства элемента (папки или файла)_
              - `LoginModal.jsx` - _логин_
              - `RegistrationModal.jsx` - _регистрация_
              - `RenameItemModal.jsx` - _переименование элемента (папки или файла)_
              - `UploadFileModal.jsx` - _загрузка файла_
    
            </details>
    
          - <details>
            <summary><code>views/</code> - <em>виды отображения данных</em></summary>
            
              - <details>
                <summary><code>adminInterfaceView/</code> - <em>для административного интерфейса</em></summary>
                
                  - `AdminInterfaceView.jsx` - _компонент вида_
                  - `AdminUserRow.jsx` - _строка пользователя_
    
                </details>
    
              - <details>
                <summary><code>gridView/</code> - <em>вид сеткой</em></summary>
                
                  - `FileStorageItem.jsx` - _файл_
                  - `FolderStorageItem.jsx` - _папка_
                  - `GridView.jsx` - _компонент вида_
                  - `StorageItem.jsx` - _общий компонент элемента_
    
                </details>
    
              - <details>
                <summary><code>listView/</code> - <em>вид списком</em></summary>
                
                  - `FileRow.jsx` - _строка файла_
                  - `FolderRow.jsx` - _строка папки_
                  - `ListRow.jsx` - _общий компонент строки_
                  - `ListView.jsx` - _компонент вида_
    
                </details>
    
            </details>
    
          - `ContextMenusList.jsx` - _список контекстных меню_
          - `FolderPathSequence.jsx` - _последовательность папок_
          - `Logo.jsx` - _логотип и название_
          - `MainHeader.jsx` - _шапка приложения_
          - `MessageAlert.jsx` - _предупреждающее сообщение_
          - `ModalsList.jsx` - _список модальных окон_
          - `SearchField.jsx` - _строка поиска_
          - `ViewSelector.jsx` - _переключение видов отображения данных_
    
        </details>
    
      - <details>
        <summary><code>hooks/</code> - <em>пользовательские хуки</em></summary>
        </details>
    
      - <details>
        <summary><code>pages/</code> - <em>компоненты страниц</em></summary>
        
          - `AdminPage.jsx` - _административный интерфейс_
          - `HomePage.jsx` - _основная (домашняя) страница_
          - `StoragePage.jsx` - _хранилище_
    
        </details>
    
      - <details>
        <summary><code>providers/</code> - <em>провайдеры состояния приложения</em></summary>
        
          - <details>
            <summary><code>admin/</code> - <em>логика для административного интерфейса</em></summary>
            
              - `AdminContext.js` - _контекст_
              - `AdminProvider.jsx` - _провайдер_
              - `useAdmin.js` - _пользовательский хук_
    
            </details>
    
          - <details>
            <summary><code>alert/</code> - <em>вывод предупреждающего сообщения</em></summary>
            
              - `AlertContext.js` - _контекст_
              - `AlertProvider.jsx` - _провайдер_
              - `useAlert.js` - _пользовательский хук_
    
            </details>
    
          - <details>
            <summary><code>auth/</code> - <em>логика аутентификации и авторизации</em></summary>
            
              - `AuthContext.js` - _контекст_
              - `AuthProvider.jsx` - _провайдер_
              - `useAuth.js` - _пользовательский хук_
    
            </details>
    
          - <details>
            <summary><code>contextMenu/</code> - <em>управление контекстными окнами</em></summary>
            
              - `ContextMenuContext.js` - _контекст_
              - `ContextMenuProvider.jsx` - _провайдер_
              - `useContextMenu.js` - _пользовательский хук_
    
            </details>
    
          - <details>
            <summary><code>modals/</code> - <em>управление модальными окнами</em></summary>
            
              - `ModalContext.js` - _контекст_
              - `ModalProvider.jsx` - _провайдер_
              - `useModal.js` - _пользовательский хук_
    
            </details>
    
          - <details>
            <summary><code>storage/</code> - <em>управление хранилищем</em></summary>
            
              - `StorageContext.js` - _контекст_
              - `StorageProvider.jsx` - _провайдер_
              - `useStorage.js` - _пользовательский хук_
    
            </details>
    
        </details>
    
      - <details>
        <summary><code>utils/</code> - <em>утилиты</em></summary>
        
          - `getCookie.js` - _получение значения Cookie по ключу_
          - `getFileIcon.js` - _получение иконки файла в зависимости от его расширения_
          - `validate.js` - _валидация данных_
    
        </details>
    
      - `index.css` - _основные стили проекта_
      - `main.jsx` - _основной компонент проекта_

    </details>

  - `.env.example` - _пример файла окружения_
  - `eslint.config.js` - _конфигурация ESLint_
  - `index.html` - _главная HTML страница_
  - `package.json` - _зависимости и скрипты_
  - `README.md` - _описание React проекта_
  - `vite.config.js` - _конфигурация сборки_
  - `yarn.lock` - _Файл зависимостей Yarn_

</details>

<details>
<summary><code>MyCloudStorage/</code> - <em>директория для медиа файлов</em></summary>

  - <details>
    <summary><code>user_files/</code> - <em></em>директория для файлов пользователей</summary>
    </details>

</details>

`.gitignore` - _список проигнорированных папок и файлов_<br>
`CHANGELOG.md` - _журнал изменений проекта_<br>
`README.md` - _основное описание проекта_<br>

---

# Архитектура и компоненты

**Раздел находится в разработке**

---

# Инструкция по развертыванию приложения на сервисе `reg.ru`

**Раздел находится в разработке**

---

# Полезные ссылки

## Ссылки на развернутое приложение
- [Приложение на Render](https://my-cloud-storage-osu1.onrender.com)  
- [Приложение на Reg.ru (в разработке)]()  

## Frontend (React)

- [React](https://react.dev/learn) — официальная документация фреймворка
- [React DOM](https://react.dev/reference/react-dom) — документация по рендерингу в DOM
- [React Router DOM](https://reactrouter.com/home) — документация по маршрутизации
- [FontAwesome](https://docs.fontawesome.com/) — документация по иконкам
- [Vite](https://vite.dev/guide/) — гайд по сборщику и настройке проекта

## Backend (Python / Django)

- [Django](https://docs.djangoproject.com/en/4.2/) — официальная документация фреймворка
- [Django REST Framework](https://www.django-rest-framework.org/) — документация по созданию API
- [psycopg2](https://www.psycopg.org/docs/) — документация драйвера PostgreSQL
- [Gunicorn](https://gunicorn.org/quickstart/) — сервер WSGI для запуска Django
- [Whitenoise](https://whitenoise.readthedocs.io/en/stable/django.html#) — документация по обслуживанию статических файлов

