<template>
    <div>
        <h1>Страница управления контентом</h1>
        <p>Этот раздел скрыт от просмотра не авторизованными пользователями через значение authorization в localStorage.</p>
        <p>Раздел "Редактирование новостей" выводит имеющийся в localStorage список новостных записей, 
           с возможностью удаления элементов списка. Кнопка "Добавить новость" - отображает div содержащий 
           поля для ввода значений новостной записи и кнопку сохранения новостной записи</p>
        <p>Для имитации работы с сервером используется localStorage</p>
    </div>
</template>

<script>
export default {
    layout: "admin",
    mounted() {
        if (localStorage.authorization == "true") {            
        } else {
        console.log(localStorage.authorization == "true")
        this.$router.push('../login/');
        }
    }
}
</script>