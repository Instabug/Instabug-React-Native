import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Screen } from '../../components/Screen';
import { useDelayedRefresh } from '../../utils/useDelayedRefresh';
import { AspectRatio, Skeleton, Image, Box } from 'native-base';

type ImageItemProps = { link: string };

const LargeImageListItem: React.FC<ImageItemProps> = ({ link }: ImageItemProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  return (
    <Box my="2">
      <Skeleton h="80" isLoaded={!isLoading} />
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: link,
          }}
          alt="image"
        />
      </AspectRatio>
    </Box>
  );
};

export const LargeImageListScreen: React.FC = () => {
  const { refreshing, onRefresh } = useDelayedRefresh();

  return (
    <Screen>
      <FlatList<string>
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={Array.from(
          { length: 100 },
          () =>
            `https://picsum.photos/${Math.floor(Math.random() * 200) + 300}/${
              Math.floor(Math.random() * 200) + 600
            }`,
        )}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <LargeImageListItem link={item} />}
      />
    </Screen>
  );
};
