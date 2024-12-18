

export const fetchData = async (url, headers = {}) => {
    const base_url = `https://dobush.kg//api/${url}`
    // const base_url = `https://shailoo.info//api/${url}`
    // const base_url = `https://ba-election-project.onrender.com/api/${url}`

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

