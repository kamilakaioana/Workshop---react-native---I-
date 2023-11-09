import { View, Text, StyleSheet, FlatList } from "react-native";
import PostCard from "../../components/PostCard";
import { useAuth } from "../../hooks/useAuth";
import { feedService } from "../../services/feed";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import CustomButton from "../../components/CustomButton";
import Message from "../../utils/toast";
import TextArea from "../../components/TextArea";
import { IPost } from "../../interfaces/interfaces";
import { colors } from "../../utils/colors";

const Home = () => {
  const { user } = useAuth();
  const [myFeed, setMyFeed] = useState<IPost[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const loadData = async () => {
    try {
      setLoading(true);
      const { data } = await feedService.getFeed();
      setMyFeed(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error();
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
      console.error(error);
    }
  };

  const onPost = async () => {
    if (!newPostContent) return;
    setLoadingPost(true);
    try {
      await feedService.createPost(newPostContent);
      await loadData();
      Message.showSuccess("Postagem realizada com sucesso");
      setNewPostContent("");
    } catch (error) {
      if (error instanceof AxiosError) {
        Message.showError("Erro ao publicar, tente mais tarde");
        console.error(error.response);
      }
    } finally {
      setLoadingPost(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greatings}>{`Olá ${user.name},`}</Text>

      <FlatList
        data={myFeed}
        onRefresh={() => loadData()}
        refreshing={loading}
        extraData={myFeed}
        keyExtractor={(post) => post.id}
        initialNumToRender={10}
        scrollToOverflowEnabled
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: 12 }}></View>
        )}
        renderItem={({ item: post }) => (
          <PostCard post={post} onLikePost={() => onLikePost(post.id)} />
        )}
        style={{ paddingHorizontal: 24 }}
        ListHeaderComponent={
          <View>
            <TextArea
              content={newPostContent}
              onChange={(text) => setNewPostContent(text)}
              placeholder="O que gostaria de compartilhar agora?"
              maxLength={280}
              numberOfLines={6}
            />

            <View style={{ marginTop: 8, marginBottom: 24 }}>
              <CustomButton
                title="Publicar"
                type="primary"
                handlePress={onPost}
                isLoading={loadingPost}
              />
            </View>
          </View>
        }
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
  greatings: {
    color: colors.purpleDark,
    textAlign: "left",
    fontSize: 24,
    marginLeft: 24,
    marginBottom: 12,
  },
});

export default Home;
