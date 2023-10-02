import { View } from "react-native";
// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";

import { COLORS } from "../../constants";

import styles from "./carousel.style";

const Carousel = () => {
  const slides = [
    "https://casacor.abril.com.br/wp-content/uploads/sites/7/2021/09/CA_6645-1.jpg?quality=90&strip=info&w=920&w=636",
    "https://blog.archtrends.com/wp-content/uploads/2020/07/redecorar-a-casa-1-8.jpg",
    "https://casacor.abril.com.br/wp-content/uploads/sites/7/2021/09/BARBARA_NOBRE_210906_006.jpg",
  ];

  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 15 }}
        imageLoadingColor={COLORS.primary}
        autoplay={true}
        circleLoop
      />
    </View>
  );
};

export default Carousel;
