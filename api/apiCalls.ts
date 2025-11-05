export const initialCall = async () => {
    try {
      const res = await fetch(
        "https://hp-api.onrender.com/api/characters"
      );
      if (res.ok) {
        const jsonData = await res.json();
        return jsonData
      } else {
        console.error("Failed to fetch characters:", res.status);
        return [];
      }
    } catch (error) {
        console.error("Error during API call:", error);
        return [];
    }
  };