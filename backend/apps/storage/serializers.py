from rest_framework import serializers
from .models import Folder, File


class CreateFolderSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Folder
        fields = ["name", "parent", "owner"]

    def validate_name(self, value):
        user = self.context["request"].user

        if "/" in value:
            raise serializers.ValidationError("Символ '/' недопустим в имени папки")

        parent = self.initial_data.get("parent")
        if Folder.objects.filter(owner=user, name=value, parent=parent).exists():
            raise serializers.ValidationError("Папка с таким именем уже существует!")
        return value


class FolderSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)

    class Meta:
        model = Folder
        fields = ["id", "name", "children", "created_at"]

    def get_children(self, obj):
        children = obj.children.all()
        return FolderSerializer(children, many=True).data


class FileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    uploaded_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    last_download_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    size_formatted = serializers.SerializerMethodField()


    class Meta:
        model = File
        fields = ["id", "original_name", "file", "folder", "owner", "size", "size_formatted", "uploaded_at", "last_download_at", "comment", "public_token"]
        read_only_fields = ["id", "original_name", "size", "size_formatted", "uploaded_at", "last_download_at", "comment", "public_token"]

    def get_size_formatted(self, obj):
        size = obj.size
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size < 1024:
                return f"{size:.2f} {unit}"
            size /= 1024
        return f"{size:.2f} PB"

    def validate(self, attrs):
        user = self.context["request"].user
        folder_id = self.initial_data.get("folder_id")
        folder = Folder.objects.filter(id=folder_id).first()
        original_name = attrs.get("file").name if attrs.get("file") else None

        if folder and folder.owner != user:
            raise serializers.ValidationError("Нельзя использовать чужую папку")

        if folder:
            exists = File.objects.filter(owner=user, original_name=original_name, folder=folder).exists()
        else:
            exists = File.objects.filter(owner=user, original_name=original_name, folder=None).exists()

        if exists:
            raise serializers.ValidationError("Файл с таким именем уже существует")
        return attrs

    def create(self, validated_data):
        uploaded_file = validated_data.pop("file")
        validated_data["comment"] = validated_data.pop("comment")
        validated_data['original_name'] = uploaded_file.name
        validated_data['size'] = uploaded_file.size
        file_instance = File.objects.create(file=uploaded_file, **validated_data)
        return file_instance
