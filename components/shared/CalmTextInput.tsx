import { TextInput, TextInputProps, TextStyle } from "react-native";
import { getTheme } from "@/modules/theme/palettes";
import { useUserStore } from "@/store/userStore";

type CalmTextInputProps = TextInputProps & {
  className?: string;
};

export function CalmTextInput({ className = "", style, ...props }: CalmTextInputProps) {
  const themeId = useUserStore((state) => state.themeId);
  const theme = getTheme(themeId);
  const inputStyle: TextStyle = {
    borderColor: theme.bgMuted,
    borderWidth: 1,
  };

  return (
    <TextInput
      placeholderTextColor={theme.textTertiary}
      selectionColor={theme.accent}
      {...props}
      className={`rounded-calm bg-bg-subtle font-body text-base text-text-primary ${className}`}
      style={[inputStyle, style]}
    />
  );
}
