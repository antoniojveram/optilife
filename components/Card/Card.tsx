import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Card as KittenCard, Text } from "@ui-kitten/components";

const Header = (props: ViewProps): React.ReactElement => (
  <View {...props}>
    <Text category="h6">Maldives</Text>
    <Text category="s1">By Wikipedia</Text>
  </View>
);

const Footer = (props: ViewProps): React.ReactElement => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button style={styles.footerControl} size="small" status="basic">
      CANCEL
    </Button>
    <Button style={styles.footerControl} size="small">
      ACCEPT
    </Button>
  </View>
);

const Card = (): React.ReactElement => (
  <KittenCard style={styles.card} header={<Header />} footer={<Footer />}>
    <Text>
      The Maldives, officially the Republic of Maldives, is a small country in
      South Asia, located in the Arabian Sea of the Indian Ocean. It lies
      southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the
      Asian continent
    </Text>
  </KittenCard>
);

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default React.memo(Card);
