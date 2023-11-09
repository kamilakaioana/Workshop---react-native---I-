import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { feedService } from "../../services/feed";
import { IPost } from "../../interfaces/interfaces";
import { colors } from "../../utils/colors";

const Profile = () => {
  const [myFeed, setMyFeed] = useState<IPost[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const loadData = async () => {
    try {
      setLoading(true);
      const { data } = await feedService.getPostsByUserId(user.profile.userId);
      setMyFeed(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const onLikePost = async (postId: string) => {
    try {
      await feedService.likePost(postId);
      await loadData();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileCard />
      <FlatList
        data={myFeed}
        onRefresh={() => loadData()}
        refreshing={loading}
        extraData={myFeed}
        keyExtractor={(post) => post.id}
        initialNumToRender={10}
        style={{ padding: 24 }}
        scrollToOverflowEnabled
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        renderItem={({ item: post }) => (
          <PostCard post={post} onLikePost={() => onLikePost(post.id)} />
        )}
        ListHeaderComponent={() => <Text>Minhas Publicações</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.backgroundLight,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 48,
    paddingBottom: 24,
  },
  separator: { marginVertical: 12 },
});

export default Profile;
