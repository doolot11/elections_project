

export const fetchData = async (url, headers = {}) => {
    // const base_url = `https://ba-election-project.onrender.com/${url}`
    const base_url = `https://fakestoreapi.com/products/${url}`

    try {
        const response = await fetch(base_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка запроса:", error.message);
        throw error;
    }
};

