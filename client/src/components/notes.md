const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977"
        );
        console.log("API Response:", response.data);
        if (response.data && response.data.meals) {
          setMealDetails(response.data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMealDetails();
  }, []);

  return (
    <div>
      {mealDetails ? (
        <div>
          <h1>{mealDetails.strMeal}</h1>
          <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
          <p>{mealDetails.strInstructions}</p>
        </div>
      ) : (
        <p>Loading meal details...</p>
      )}
    </div>
  );
};

export default Home;
