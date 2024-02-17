import { Stack, Link } from 'expo-router';
import { Camera } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    {
      name: 'bear-storage',
    }
  )
);

export default function Page() {
  useBearStore();

  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Overview' }} />
      <View className={styles.main}>
        <View>
          <Text className={styles.title}>
            <Camera color="red" size={48} />
            Hello World
          </Text>
          <Text className={styles.subtitle}>This is the first page of your app.</Text>
        </View>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <TouchableOpacity className={styles.button}>
            <Text className={styles.buttonText}>Show Details</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960] justify-between',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
