import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useAuth } from "../../hooks/useAuth";
import { useMemo } from "react";
import { colors } from "../../utils/colors";
import { IPost } from "../../interfaces/interfaces";

interface IPostCardProps {
  post: IPost;
  onLikePost: () => void;
  isLoading?: boolean;
}

const PostCard: React.FC<IPostCardProps> = ({
  post,
  onLikePost,
  isLoading,
}) => {
  const { user } = useAuth();
  const numberLikes = post.likes?.length;
  const loggedUserLiked = post.likes?.find((like) => like.userId === user.id);
  const likeButtonColor = useMemo(() => {
    return loggedUserLiked ? colors.purpleBase : colors.gray;
  }, [loggedUserLiked]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.owner?.name}</Text>
      <Text style={{ color: colors.text.subtitle }}>{post.content}</Text>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", marginTop: 8 }}
        onPress={onLikePost}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <FontAwesome name="heart" color={likeButtonColor} size={20} />
        )}

        <Text style={{ marginLeft: 8, color: likeButtonColor }}>
          {numberLikes}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    width: "100%",
    padding: 24,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.purpleDark,
    marginBottom: 4,
  },
});

export default PostCard;
