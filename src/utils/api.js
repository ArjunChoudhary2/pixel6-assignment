export const checkPan = async (pan) => {
    try {
      const response = await fetch("https://lab.pixel6.co/api/verify-pan.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ panNumber: pan }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  export const fetchArea = async (postcode) => {
    try {
      const response = await fetch(
        "https://lab.pixel6.co/api/get-postcode-details.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode }),
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  