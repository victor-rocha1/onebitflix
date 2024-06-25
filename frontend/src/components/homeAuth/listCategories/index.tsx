import "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService, { CategoryType } from "../../../services/categoriesService";
import ListCategoriesSlide from "../listCategoriesSlide";

const ListCategories = function () {
    const { data, error } = useSWR("/listCategories", categoriesService.getCategories);

    if (error) return error;
    return (
        <>
            <p>Loading...</p>
        </>
    );

    return (
        <>
          {data.data.categories?.map((category: CategoryType) => (
            <><p>{category.name}</p><ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name} /></>
        ))}
        </>
    );
};

export default ListCategories;