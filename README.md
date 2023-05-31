# Organizer: life monitoring

### Описание

Набор приложений для мониторинга жизни.  
Минимальная поддерживаемая ширина экрана: 370 px.

### Запуск

`npm install`  
`npm run start`

### Приложения

- [x] Календарь
- [x] Колесо баланса
- [x] Прием медикаментов
- [x] Виртуальный гардероб
- [x] Чеклисты
- [ ] Книга рецептов
- [ ] Таблица КПТ
- [ ] Тренировки с собаками
- [ ] Дашборд
- [ ] 6 минут
- [ ] Документы
- [ ] Женские дни
- [ ] Маникюрная лента
- [ ] Заметки
- [ ] Режим дня
- [ ] Траты на ремонт
- [ ] Вишлист
- [ ] Таймер Помодоро
- [ ] Статистика
- [ ] Глобальный поиск

### Как добавлять приложение

- добавить пункт меню в `src/const/navigation.tsx`
- добавить правила импортов в `.eslintrc.json`, `.prettierrc.json` по аналогии
- добавить алиасы в `craco.config.ts` и `tsconfig.json` по аналогии
- создать приложение в `src/apps`, запустив из любого места команду `npx hygen component new App --path src/apps/`
- получившуюся папку `App` переименовать в название приложения
- по мере разработки добавлять в `src/apps[НАЗВАНИЕ_ПРИЛОЖЕНИЯ]` необходимые папки
- в файле `src/apps[НАЗВАНИЕ_ПРИЛОЖЕНИЯ]/index.ts` добавить псевдоним приложения через as
- добавить приложение в `src/const/navigation.tsx` (поле `element`)
